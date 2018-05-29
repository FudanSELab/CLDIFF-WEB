package edu.fdu.se.web.astdiff;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
        String commitId = request.getParameter("commitId");
        String fileName = request.getParameter("fileName");
        String fileType = request.getParameter("SrcOrDstOrJson");
        responseWithFile(response, commitId, fileName, fileType);
    }
    // commitId:XXXX fileName:null SrcOrDstOrJson: meta.json
    // commitId:XXXX fileName:XXX.java SrcOrDstOrJson: diff.json
    // commitId:XXXX fileName:XXX.java SrcOrDstOrJson: src
    // commitId:XXXX fileName:XXX.java SrcOrDstOrJson: dst
    // commitId:XXXX fileName:XXX.java SrcOrDstOrJson: link.json

    public void responseWithFile(HttpServletResponse response, String commitId, String fileName, String fileType) throws ServletException, IOException {
//		ProjectProperties pp =  ProjectProperties.getInstance();
//		String root = ProjectProperties.getInstance().getValue(PropertyKeys.RQ3);
        String root = this.getServletContext().getRealPath("") + File.separator + "RQ3";
        File f = new File(root);
        File[] files = f.listFiles();
        File[] commits = null;
        List<File> allCommits = new ArrayList();
        for (File f2 : files) {
            commits = f2.listFiles();
            for (File temp : commits) {
                allCommits.add(temp);
            }
        }
        File target = null;
        for (File commit : allCommits) {
            if (commit.getName().equals(commitId)) {
                target = commit;
                break;
            }
        }
        ServletOutputStream sos = response.getOutputStream();
        File[] commitMeta = target.listFiles();
        if (fileType.equals("meta.json")) {
            for (File tmp : commitMeta) {
                if (tmp.getName().equals("meta.json")) {
                    writeToSos(tmp, sos);
                    return;
                }
            }
        }
        if (fileType.equals("link.json")) {
            for (File tmp : commitMeta) {
                if (tmp.getName().equals("link.json")) {
                    writeToSos(tmp, sos);
                    return;
                }
            }
        }
        List<File> list = new ArrayList();
        browse(target, list);
        for (File tmp : list) {
            if (fileType.equals("src")
                    && tmp.getAbsolutePath().contains(File.separator + "prev" + File.separator) && tmp.getAbsolutePath().endsWith(File.separator + fileName)) {
                writeToSos(tmp, sos);
                return;
            } else if (fileType.equals("dst")
                    && tmp.getAbsolutePath().contains(File.separator + "curr" + File.separator) && tmp.getAbsolutePath().endsWith(File.separator + fileName)) {
                writeToSos(tmp, sos);
                return;
            } else if (fileType.equals("diff.json")
                    && tmp.getAbsolutePath().endsWith("Diff" + fileName + ".json")) {
                writeToSos(tmp, sos);
                return;
            }
        }

    }


    public void browse(File f, List<File> fileList) {
        File[] list = f.listFiles();
        for (File tmp : list) {
            if (tmp.isDirectory()) {
                browse(tmp, fileList);
            } else {
                fileList.add(tmp);
            }

        }
    }

    public void writeToSos(File file, ServletOutputStream sos) throws ServletException, IOException {
        if (file.exists()) {
            if (file.getName().equals("meta.json") || file.getName().endsWith(".json")) {
                String whole = "";
                Scanner in = new Scanner(file);
                while (in.hasNextLine()) {
                    String str = in.nextLine();
                    whole += str;
                }

                if (file.getName().equals("meta.json") || file.getName().equals("link.json")) {
                    JSONObject obj = JSONObject.fromObject(whole);
                    sos.write(obj.toString().getBytes());
                } else {
                    JSONArray array = JSONArray.fromObject(whole);
                    sos.write(array.toString().getBytes());
                }
            } else {
                FileInputStream fis = new FileInputStream(file);
                byte[] buffer = new byte[1024 * 1024];
                int res = -1;
                while ((res = fis.read(buffer)) != -1) {
                    sos.write(buffer);
                }
                fis.close();
                sos.flush();
            }
        }

    }

}
