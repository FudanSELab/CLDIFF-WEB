package edu.fdu.se.web.astdiff;

public class API {

    public static final String SERVER_REMOTE = "http://10.141.221.83:8081";
    // starts server in CLDIFF
    public static final String SERVER_LOCAL = "http://localhost:8082";

    {
        String value = ProjectProperties.getInstance().getValue("deploy_type");

        if("remote".equals(value)){
            SERVER = SERVER_REMOTE;
        }else{
            SERVER = SERVER_LOCAL;
        }
    }
    public static String SERVER;
    public static String FETCH_META = SERVER;
    public static String FETCH_CONTENT = SERVER+"/fetchFile";

}
