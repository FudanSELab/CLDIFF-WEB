package edu.fdu.se.web.astdiff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

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
		Map<String, String> params = new HashMap<String,String>();
		Enumeration ele =  request.getParameterNames();
		while(ele.hasMoreElements()){
			String key = (String)ele.nextElement();
			String value = request.getParameter(key);
			params.put(key,value);
		}
		String result="ERROR";

		if(params.size()!=0) {
			try {
				result = HttpClient.doPostMap(API.FETCH_CONTENT,params);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println(result);
		response.getWriter().print(result);
	}

}
