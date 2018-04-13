public abstract class AccessibilityService extends Service {

    public interface Callbacks {
        void onAccessibilityEvent(AccessibilityEvent event);
        void onInterrupt();
        void onServiceConnected();
        void init(int connectionId, IBinder windowToken);
        boolean onGesture(int gestureId);
        boolean onKeyEvent(KeyEvent event);
        void onMagnificationChanged(@NonNull Region region,
                float scale, float centerX, float centerY);
        void onSoftKeyboardShowModeChanged(int showMode);
        void onPerformGestureResult(int sequence, boolean completedSuccessfully);
    }

    private void dispatchServiceConnected() {
        if (mMagnificationController != null) {
            mMagnificationController.onServiceConnected();
        }
        if (mSoftKeyboardController != null) {
            mSoftKeyboardController.onServiceConnected();
        }

        onServiceConnected();
    }

    public static final class SoftKeyboardController {

        void dispatchSoftKeyboardShowModeChanged(final int showMode) {
            final ArrayMap<OnShowModeChangedListener, Handler> entries;
            synchronized (mLock) {
                if (mListeners == null || mListeners.isEmpty()) {
                    Slog.w(LOG_TAG, "Received soft keyboard show mode changed callback"
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

    public float getCenterX() {
            final IAccessibilityServiceConnection connection =
                    AccessibilityInteractionClient.getInstance().getConnection(
                            mService.mConnectionId);
            if (connection != null) {
                try {
                    return connection.getMagnificationCenterX();
                } catch (RemoteException re) {
                    Log.w(LOG_TAG, "Failed to obtain center X", re);
                    re.rethrowFromSystemServer();
                }
            }
            return 0.0f;
        }

    public AccessibilityNodeInfo findFocus(int focus) {
        return AccessibilityInteractionClient.getInstance().findFocus(mConnectionId,
                AccessibilityWindowInfo.ANY_WINDOW_ID, AccessibilityNodeInfo.ROOT_NODE_ID, focus);
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

            @Override
            public void onFingerprintCapturingGesturesChanged(boolean active) {
                AccessibilityService.this.onFingerprintCapturingGesturesChanged(active);
            }

            @Override
            public void onFingerprintGesture(int gesture) {
                AccessibilityService.this.onFingerprintGesture(gesture);
            }

            @Override
            public void onAccessibilityButtonClicked() {
                AccessibilityService.this.onAccessibilityButtonClicked();
            }

            @Override
            public void onAccessibilityButtonAvailabilityChanged(boolean available) {
                AccessibilityService.this.onAccessibilityButtonAvailabilityChanged(available);
            }
        });
    }

    public static class IAccessibilityServiceClientWrapper extends IAccessibilityServiceClient.Stub
            implements HandlerCaller.Callback {

        public void onAccessibilityEvent(AccessibilityEvent event, boolean serviceWantsEvent) {
            Message message = mCaller.obtainMessageBO(
                    DO_ON_ACCESSIBILITY_EVENT, serviceWantsEvent, event);
            mCaller.sendMessage(message);
        }

        @Override
        public void executeMessage(Message message) {
            switch (message.what) {
                case DO_ON_ACCESSIBILITY_EVENT: {
                    AccessibilityEvent event = (AccessibilityEvent) message.obj;
                    boolean serviceWantsEvent = message.arg1 != 0;
                    if (event != null) {
                        AccessibilityInteractionClient.getInstance().onAccessibilityEvent(event);
                        if (serviceWantsEvent) {
                            mCallback.onAccessibilityEvent(event);
                        }
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
                case DO_ON_FINGERPRINT_ACTIVE_CHANGED: {
                    mCallback.onFingerprintCapturingGesturesChanged(message.arg1 == 1);
                } return;
                case DO_ON_FINGERPRINT_GESTURE: {
                    mCallback.onFingerprintGesture(message.arg1);
                } return;

                case (DO_ACCESSIBILITY_BUTTON_CLICKED): {
                    mCallback.onAccessibilityButtonClicked();
                } return;

                case (DO_ACCESSIBILITY_BUTTON_AVAILABILITY_CHANGED): {
                    final boolean available = (message.arg1 != 0);
                    mCallback.onAccessibilityButtonAvailabilityChanged(available);
                } return;

                default :
                    Log.w(LOG_TAG, "Unknown message type " + message.what);
            }
        }
    }


}