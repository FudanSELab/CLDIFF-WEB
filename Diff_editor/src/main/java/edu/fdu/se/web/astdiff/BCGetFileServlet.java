package edu.fdu.se.web.astdiff;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
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
public class BCGetFileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BCGetFileServlet() {
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
//        if (request.getParameter("commit_url") != null) {
//            String commitUrl = request.getParameter("commit_url");
//            String postString = "url=" + commitUrl;
//            System.out.println(postString);
//            ServletOutputStream sos = response.getOutputStream();
//            String whole = "";
//            File file = new File("C:\\Users\\yw\\Desktop\\meta.json");
//            Scanner in = new Scanner(file);
//            while (in.hasNextLine()) {
//                String str = in.nextLine();
//                whole += str;
//            }
//            System.out.println(whole);
//            JSONObject obj = JSONObject.fromObject(whole);
//            sos.write(obj.toString().getBytes());
//        }
        if (request.getParameter("author") != null) {
            String commit_hash = request.getParameter("commit_hash");
            String parent_commit_hash = request.getParameter("parent_commit_hash");
            String project_name = request.getParameter("project_name");
            String prev_file_path = request.getParameter("prev_file_path");
            String curr_file_path = request.getParameter("curr_file_path");

            String params = "commit_hash=" + commit_hash + "&parent_commit_hash=" + parent_commit_hash + "&project_name=" + project_name + "&prev_file_path=" + prev_file_path + "&curr_file_path=" + curr_file_path;
            System.out.println(params);
            //String result = HttpClient.doPost("http://10.141.221.83:8081/fetchFile", params);
            String result = HttpClient.doPost(API.FETCH_CONTENT, params);
            System.out.println(result);
            PrintWriter out = response.getWriter();    //设定传参变量
            out.print(result);      //结果传到前端
            System.out.println("author"+request.getParameter("author"));
            System.out.println("commit_hash"+request.getParameter("commit_hash"));
            System.out.println("parent_commit_hash"+request.getParameter("parent_commit_hash"));
            System.out.println("project_name"+request.getParameter("project_name"));
            System.out.println("prev_file_path"+request.getParameter("prev_file_path"));
            System.out.println("curr_file_path"+request.getParameter("curr_file_path"));
        }
    }	

}
