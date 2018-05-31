package edu.fdu.se.web.astdiff;

public class main {

    public static void main(String[] args){
        String result = HttpClient.doPost("http://127.0.0.1:8081/fetchFile&a=b", "c=d&b=e");
    }
}
