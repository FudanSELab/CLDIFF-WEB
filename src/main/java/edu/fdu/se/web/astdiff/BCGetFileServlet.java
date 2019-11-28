package edu.fdu.se.web.astdiff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class TestFileServlet
 */
@WebServlet("/BCGetFileServlet")
public class BCGetFileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BCGetFileServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 //author、commit_hash、parent_commit_hash、project_name、prev_file_path、curr_file_path
		ProjectProperties.createInstance(this.getServletContext());
		System.out.println("post");
        if (request.getParameter("author") != null) {
        	String file_name = request.getParameter("file_name");
        	System.out.println("POST: "+file_name);
        	Enumeration e =  request.getParameterNames();
        	StringBuilder sb = new StringBuilder();
        	while(e.hasMoreElements()){
        		String key = (String)e.nextElement();
        		String value = request.getParameter(key);
        		sb.append(key+"="+value+"&");
        	}
        	System.out.println(sb.toString());
            String result = HttpClient.doPost(API.FETCH_CONTENT, sb.toString().substring(0, sb.toString().length()-1));
            System.out.println(result);
            PrintWriter out = response.getWriter();    //设定传参变量
            out.print(result);      //结果传到前端
        }
    }	

}
