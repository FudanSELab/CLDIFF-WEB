package edu.fdu.se.web.astdiff;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.impl.client.HttpClients;


public class HttpComponent {
    final static CloseableHttpClient client = HttpClients.createDefault();

    // 常规调用
    public String sendPostForm(String url, Map<String, String> params) throws Exception {
        HttpPost request = new HttpPost(url);

        // set header
        request.setHeader("X-Http-Demo", HttpComponent.class.getSimpleName());
        // set params
        if (params != null) {
            List<NameValuePair> nameValuePairList = new ArrayList<NameValuePair>();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                nameValuePairList.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            UrlEncodedFormEntity bodyEntity = new UrlEncodedFormEntity(nameValuePairList, "UTF-8");
            request.setEntity(new UrlEncodedFormEntity(nameValuePairList));
        }

        // send request
        CloseableHttpResponse response = client.execute(request);
        // read rsp code
        // return content

        String ret = readResponseContent(response.getEntity().getContent());
        response.close();
        return ret;
    }



    private String readResponseContent(InputStream inputStream) throws Exception {
        if (inputStream == null) {
            return "";
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buf = new byte[512];
        int len;
        while (inputStream.available() > 0) {
            len = inputStream.read(buf);
            out.write(buf, 0, len);
        }

        return out.toString();
    }

    public static void main(String[] args) throws Exception {
        HttpComponent httpUrlConnectionDemo = new HttpComponent();
        String url = "https://httpbin.org/post";
        Map<String, String> params = new HashMap<String, String>();
        params.put("foo", "bar中文");
        String rsp = httpUrlConnectionDemo.sendPostForm(url, params);
    }
}
