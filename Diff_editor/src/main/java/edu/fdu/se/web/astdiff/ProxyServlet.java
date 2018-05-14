package edu.fdu.se.web.astdiff;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ProxyServlet")
public class ProxyServlet  extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public ProxyServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String commitId = request.getParameter("commitId");
		String repository = request.getParameter("repository");
		String repositoryId = request.getParameter("repositoryId");
		String postString = "commitId=" + commitId +"&repository="+repository+"&repositoryId="+repositoryId;
		String result = HttpClient.doPost("http://10.141.221.83:12007/DiffMiner/main", postString);
//		String result = HttpClient.doPost("http://127.0.0.1:12007/DiffMiner/main",postString);
		System.out.println(result);
	}

}
