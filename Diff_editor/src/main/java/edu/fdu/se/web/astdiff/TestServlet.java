package edu.fdu.se.web.astdiff;

import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//@WebServlet("/TestServlet") // This is the URL of the servlet.
public class TestServlet extends HttpServlet { // Must be public and extend HttpServlet.
    // ...

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println("TestServlet");
        if (request.getParameter("commit_url") != null) {
            String commitUrl = request.getParameter("commit_url");
            String postString = "url=" + commitUrl;
            System.out.println(postString);
            String result = HttpClient.doPost(API.FETCH_META, postString);
            System.out.println(result);
            PrintWriter out = response.getWriter();    //设定传参变量
            out.print(result);      //结果传到前端

//            //将result数据打包
//            request.setAttribute("meta", result);
//            //将result数据发送到.jap文件中
//            request.getRequestDispatcher("index.jsp").forward(request, response);
            /*JSONObject resultJson = JSONObject.fromObject(result);
            if (resultJson.getBoolean("result")&&!resultJson.getString("errorMessage").isEmpty()) {
                PrintWriter out = response.getWriter();
                out.println("<script type=\"text/javascript\">");
                String alert = new StringBuffer("alert('").append(resultJson.getString("errorMessage")).append("');").toString();
                out.println(alert);
                System.out.println(alert);
                out.println("</script>");
            }*/

        }

        /*   if (request.getParameter("submit") != null) {
            int a = 1;
        }

        int b = 1;
        String commitId = request.getParameter("commitId");
        String repository = request.getParameter("repository");
        String repositoryId = request.getParameter("repositoryId");
        String postString = "commitId=" + commitId + "&repository=" + repository + "&repositoryId=" + repositoryId;
        String result = HttpClient.doPost("http://10.141.221.83:12007/DiffMiner/main", postString);
//		String result = HttpClient.doPost("http://127.0.0.1:12007/DiffMiner/main",postString);
        System.out.println(result);*/
    }


}