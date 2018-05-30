package edu.fdu.se.web.astdiff;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

/**
 * Servlet implementation class TestFileServlet
 */
@WebServlet("/TestFileServlet")
public class TestFileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestFileServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 //author、commit_hash、parent_commit_hash、project_name、prev_file_path、curr_file_path
		System.out.println("post");
        if (request.getParameter("commit_url") != null) {
            String commitUrl = request.getParameter("commit_url");
            String postString = "url=" + commitUrl;
            System.out.println(postString);
            ServletOutputStream sos = response.getOutputStream();
            String whole = "";
            File file = new File("C:\\Users\\yw\\Desktop\\meta.json");
            Scanner in = new Scanner(file);
            while (in.hasNextLine()) {
                String str = in.nextLine();
                whole += str;
            }
            System.out.println(whole);
            JSONObject obj = JSONObject.fromObject(whole);
            sos.write(obj.toString().getBytes());
        }
        else if (request.getParameter("author") != null) {
            System.out.println("author"+request.getParameter("author"));
            System.out.println("commit_hash"+request.getParameter("commit_hash"));
            System.out.println("parent_commit_hash"+request.getParameter("parent_commit_hash"));
            System.out.println("project_name"+request.getParameter("project_name"));
            System.out.println("prev_file_path"+request.getParameter("prev_file_path"));
            System.out.println("curr_file_path"+request.getParameter("curr_file_path"));
        }
    }	

}
