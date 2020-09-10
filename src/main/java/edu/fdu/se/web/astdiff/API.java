package edu.fdu.se.web.astdiff;


public class API {
    /**
     * CodeWisdom
     * deploy_type = online
     * repo_source = online
     */
    public static final String ONLINE_SERVER_REMOTE = "http://10.176.34.86:8081";
    // aliyun
//    public static final String ONLINE_SERVER_REMOTE = "http://106.14.239.166:8081";
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


//    public static final String DIFF_GRAPH_SERVER = "http://47.103.220.13:12009";
    public static final String DIFF_GRAPH_SERVER = "http://10.141.221.85:12009";


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

        String isGraphJson = ProjectProperties.getInstance().getValue("diffgraph");
        if("true".equals(isGraphJson)){
            SERVER = DIFF_GRAPH_SERVER;
        }
    }
    public static String SERVER;
    public static String FETCH_META = SERVER+"/fetchMeta";
    public static String FETCH_CONTENT = SERVER+"/fetchFile";
    public static String CLEAR_COMMIT_RECORD = SERVER+"/clearCommitRecord";



}
