package edu.fdu.se.web.astdiff;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 请求文件内容
 */
public class FileContentServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String commit_hash = "220a1865d80f5bd46cd378d060dfd0ba276b8c57";
        String parent_commit_hash = "d055523c185381f084496d74730988fcd6d4e9f5";
        String project_name = "ThirdPartyLibraryAnalysis";
        String prev_file_path = "prev/d055523c185381f084496d74730988fcd6d4e9f5/src/main/java/cn/edu/fudan/se/api/FileDbDataFlow.java";
        String curr_file_path = "curr/d055523c185381f084496d74730988fcd6d4e9f5/src/main/java/cn/edu/fudan/se/api/FileDbDataFlow.java";

        String params = "commit_hash=" + commit_hash + "&parent_commit_hash=" + parent_commit_hash + "&project_name=" + project_name + "&prev_file_path=" + prev_file_path + "&curr_file_path=" + curr_file_path;
        System.out.println(params);
        String result = HttpClient.doPost("http://127.0.0.1:8081/fetchFile", params);
        System.out.println(result);
        PrintWriter out = resp.getWriter();    //设定传参变量
        out.print(result);      //结果传到前端

    }
}
