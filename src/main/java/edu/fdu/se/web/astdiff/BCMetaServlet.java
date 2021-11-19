package edu.fdu.se.web.astdiff;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/BCMetaServlet") // This is the URL of the servlet.
public class BCMetaServlet extends HttpServlet {

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     * entrance when onclick
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ProjectProperties.createInstance(this.getServletContext());
        System.out.println("post");
        Map<String, String> params = new HashMap<>();
        Enumeration ele =  request.getParameterNames();
        while(ele.hasMoreElements()){
            String key = (String)ele.nextElement();
            String value = request.getParameter(key);
            params.put(key,value);
        }
        String result="ERROR";
        if(params.size()!=0) {
            try {
                System.out.println(API.FETCH_META);
                result = HttpClient.doPostMap(API.FETCH_META,params);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println(result);
        response.getWriter().print(result);
    }



}