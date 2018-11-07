package edu.fdu.se.web.astdiff;

import javax.servlet.ServletContext;

public class API {
    /**
     * CodeWisdom
     * deploy_type = online
     * repo_source = online
     */
    private static final String ONLINE_SERVER_REMOTE = "http://10.141.221.83:8081";
    /**
     * Debugging CodeWisdom local
     * deploy_type = online
     * repo_source = offline
     */
    private static final String ONLINE_SERVER_LOCAL = "http://localhost:8081";
    /**
     * CLDIFF alone, local repo
     * deploy_type = offline
     * repo_source = offline
     */
    private static final String OFFLINE_SERVER_LOCAL = "http://localhost:8082";


    static {
        String deployType = ProjectProperties.getInstance().getValue("deploy_type");
        String repoSource = ProjectProperties.getInstance().getValue("repo_source");
        if("online".equals(deployType) && "online".equals(repoSource)) {
            SERVER = ONLINE_SERVER_REMOTE;
        }else if("offline".equals(deployType)&&"online".equals(repoSource)){
            SERVER = ONLINE_SERVER_LOCAL;
        }else{
            SERVER = OFFLINE_SERVER_LOCAL;
        }
    }
    public static String SERVER;
    public static String FETCH_META = SERVER+"/fetchMeta";
    public static String FETCH_CONTENT = SERVER+"/fetchFile";
    public static String CLEAR_COMMIT_RECORD = SERVER+"/clearCommitRecord";

}
