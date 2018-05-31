package edu.fdu.se.web.astdiff;

public class main {

    public static void main(String[] args){
        String result = HttpClient.doGet("https://github.com/spring-projects/spring-framework/commit/3c1adf7f6af0dff9bda74f40dabe8cf428a62003");
        System.out.println(result);
    }
}
