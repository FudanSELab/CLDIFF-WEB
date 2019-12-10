package edu.fdu.se.web.astdiff;


public class API {
    /**
     * CodeWisdom
     * deploy_type = online
     * repo_source = online
     */
    public static final String ONLINE_SERVER_REMOTE = "http://106.14.239.166:8081";
    /**
     * Debugging CodeWisdom local
     * deploy_type = offline
     * repo_source = online
     */
    public static final String ONLINE_SERVER_LOCAL = "http://localhost:8081";
    /**
     * CLDIFF alone, local repo
     * deploy_type = offline
     * repo_source = offline
     */
    public static final String OFFLINE_SERVER_LOCAL = "http://localhost:8082";


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
