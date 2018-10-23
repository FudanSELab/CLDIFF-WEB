package edu.fdu.se.web.astdiff;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Clear
 */
@WebServlet("/BCClearCacheServelet")
public class BCClearCacheServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public BCClearCacheServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ProjectProperties.createInstance(this.getServletContext());
        String result = HttpClient.doGet(API.CLEAR_COMMIT_RECORD);
        PrintWriter out = response.getWriter();
        out.print(result);
//        response.getWriter().append("Served at: ").append(request.getContextPath());
    }


}
