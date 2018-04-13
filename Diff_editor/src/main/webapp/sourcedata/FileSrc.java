public abstract class AccessibilityService extends Service {
    
    private void onMagnificationChanged(@NonNull Region region, float scale,
            float centerX, float centerY) {
        if (mMagnificationController != null) {
            mMagnificationController.dispatchMagnificationChanged(
                    region, scale, centerX, centerY);
        }
    }

    public interface Callbacks {
        public void onAccessibilityEvent(AccessibilityEvent event);
        public void onInterrupt();
        public void onServiceConnected();
        public void init(int connectionId, IBinder windowToken);
        public boolean onGesture(int gestureId);
        public boolean onKeyEvent(KeyEvent event);
        public void onMagnificationChanged(@NonNull Region region,
                float scale, float centerX, float centerY);
        public void onSoftKeyboardShowModeChanged(int showMode);
        public void onPerformGestureResult(int sequence, boolean completedSuccessfully);
    }

    private void dispatchServiceConnected() {
        if (mMagnificationController != null) {
            mMagnificationController.onServiceConnected();
        }

        onServiceConnected();
    }

    public static final class SoftKeyboardController {

        void dispatchSoftKeyboardShowModeChanged(final int showMode) {
            final ArrayMap<OnShowModeChangedListener, Handler> entries;
            synchronized (mLock) {
                if (mListeners == null || mListeners.isEmpty()) {
                    Slog.d(LOG_TAG, "Received soft keyboard show mode changed callback"
                            + " with no listeners registered!");
                    setSoftKeyboardCallbackEnabled(false);
                    return;
                }

                entries = new ArrayMap<>(mListeners);
            }

            for (int i = 0, count = entries.size(); i < count; i++) {
                final OnShowModeChangedListener listener = entries.keyAt(i);
                final Handler handler = entries.valueAt(i);
                if (handler != null) {
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            listener.onShowModeChanged(SoftKeyboardController.this, showMode);
                        }
                    });
                } else {
                    listener.onShowModeChanged(this, showMode);
                }
            }
        }



    }

    public AccessibilityNodeInfo findFocus(int focus) {
        return AccessibilityInteractionClient.getInstance().findFocus(mConnectionId,
                AccessibilityNodeInfo.ANY_WINDOW_ID, AccessibilityNodeInfo.ROOT_NODE_ID, focus);
    }

    @Override
    public final IBinder onBind(Intent intent) {
        return new IAccessibilityServiceClientWrapper(this, getMainLooper(), new Callbacks() {
            @Override
            public void onServiceConnected() {
                AccessibilityService.this.dispatchServiceConnected();
            }

            @Override
            public boolean onKeyEvent(KeyEvent event) {
                return AccessibilityService.this.onKeyEvent(event);
            }

            @Override
            public void onMagnificationChanged(@NonNull Region region,
                    float scale, float centerX, float centerY) {
                AccessibilityService.this.onMagnificationChanged(region, scale, centerX, centerY);
            }

            @Override
            public void onSoftKeyboardShowModeChanged(int showMode) {
                AccessibilityService.this.onSoftKeyboardShowModeChanged(showMode);
            }

            @Override
            public void onPerformGestureResult(int sequence, boolean completedSuccessfully) {
                AccessibilityService.this.onPerformGestureResult(sequence, completedSuccessfully);
            }
        });
    }

    public static class IAccessibilityServiceClientWrapper extends IAccessibilityServiceClient.Stub
            implements HandlerCaller.Callback {

        public void onAccessibilityEvent(AccessibilityEvent event) {
            Message message = mCaller.obtainMessageO(DO_ON_ACCESSIBILITY_EVENT, event);
            mCaller.sendMessage(message);
        }

        @Override
        public void executeMessage(Message message) {
            switch (message.what) {
                case DO_ON_ACCESSIBILITY_EVENT: {
                    AccessibilityEvent event = (AccessibilityEvent) message.obj;
                    if (event != null) {
                        AccessibilityInteractionClient.getInstance().onAccessibilityEvent(event);
                        mCallback.onAccessibilityEvent(event);
                        try {
                            event.recycle();
                        } catch (IllegalStateException ise) {
                        }
                    }
                } return;


                case DO_ON_MAGNIFICATION_CHANGED: {
                    final SomeArgs args = (SomeArgs) message.obj;
                    final Region region = (Region) args.arg1;
                    final float scale = (float) args.arg2;
                    final float centerX = (float) args.arg3;
                    final float centerY = (float) args.arg4;
                    mCallback.onMagnificationChanged(region, scale, centerX, centerY);
                } return;

                case DO_ON_SOFT_KEYBOARD_SHOW_MODE_CHANGED: {
                    final int showMode = (int) message.arg1;
                    mCallback.onSoftKeyboardShowModeChanged(showMode);
                } return;

                case DO_GESTURE_COMPLETE: {
                    final boolean successfully = message.arg2 == 1;
                    mCallback.onPerformGestureResult(message.arg1, successfully);
                } return;

                default :
                    Log.w(LOG_TAG, "Unknown message type " + message.what);
            }
        }
    }


}