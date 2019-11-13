package edu.fdu.se.web.astdiff;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/BCMetaServlet") // This is the URL of the servlet.
public class BCMetaServlet extends HttpServlet { // Must be public and extend HttpServlet.
    // ...

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     * entrance when onclick
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ProjectProperties.createInstance(this.getServletContext());
        if (request.getParameter("commit_url") != null) {
            String commitUrl = request.getParameter("commit_url");
            String postString = "url=" + commitUrl;
            System.out.println(postString);
            System.out.println("MetaUrl:" + API.FETCH_META);
            String result = HttpClient.doPost(API.FETCH_META, postString);
            System.out.println(result);
            PrintWriter out = response.getWriter();    //设定传参变量
            out.print(result);      //结果传到前端
        }
    }



}