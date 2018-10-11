package edu.fdu.se.web.astdiff;

public class API {

    public static final String SERVER_REMOTE = "http://10.141.221.83:8081";
    // starts server in CLDIFF
    public static final String SERVER_LOCAL = "http://localhost:8082";

    static {
        String value = ProjectProperties.getInstance().getValue("deploy_type");
        String value2 = ProjectProperties.getInstance().getValue("offline");
        if("online".equals(value) && "online".equals(value2)){
            SERVER = SERVER_REMOTE;
        }else{
            SERVER = SERVER_LOCAL;
        }
    }
    public static String SERVER;
    public static String FETCH_META = SERVER+"/fetchMeta";
    public static String FETCH_CONTENT = SERVER+"/fetchFile";

}
