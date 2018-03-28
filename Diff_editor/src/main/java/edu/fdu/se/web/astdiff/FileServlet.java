package edu.fdu.se.web.astdiff;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class FileServlet
 */
@WebServlet("/FileServlet")
public class FileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileServlet() {
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
		String fileName = request.getParameter("fileName");
		String fileType = request.getParameter("SrcOrDstOrJson");
		
		responseWithFile(response,fileName,fileType);
//		doGet(request, response);
	}
	
	public void responseWithFile (HttpServletResponse response,String fileName,String fileType) throws ServletException, IOException {
		ServletOutputStream sos = response.getOutputStream();
		String path = "C:/Users/huangkaifeng/Desktop/"+fileName+"/";
		if(fileType.equals("src")){
			path+= "FileSrc.java";
		}else if(fileType.equals("dst")){
			path+= "FileDst.java";
		}else if(fileType.equals("json")){
			path+="File.json";
		}
		File file = new File(path);
		if(file.exists()){
			FileInputStream fis = new FileInputStream(file);
			byte[] buffer = new byte[1024*1024];
			int res = -1;
			while((res = fis.read(buffer))!=-1){
				sos.write(buffer);
			}
			fis.close();
			sos.flush();
		}
	}

}
