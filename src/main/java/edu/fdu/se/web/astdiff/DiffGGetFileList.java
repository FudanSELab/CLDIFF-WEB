package edu.fdu.se.web.astdiff;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/getfilelist")
public class DiffGGetFileList extends HttpServlet {

    /**
     * @see HttpServlet#HttpServlet()
     */
    public DiffGGetFileList() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ProjectProperties.createInstance(this.getServletContext());
        response.setHeader("Content-Type", "application/json");
        String result = HttpClient.doGet(API.SERVER+"/cldiffweb/getlist");
        if(result.startsWith("Content-type: application/json")){
            result = result.replace("Content-type: application/json","");
        }
        PrintWriter out = response.getWriter();
        out.print(result);
    }
}
