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

@WebServlet("/getjson")
public class DiffGGetGraphJson extends HttpServlet {


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
                result = HttpClient.doPostMap(API.SERVER+"/cldiffweb/getjson",params);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println(result);
        response.getWriter().print(result);
    }
}
