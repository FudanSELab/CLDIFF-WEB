package edu.fdu.se.web.astdiff;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties; 

public class ProjectProperties {
	private Map<String,String> kvMap;
	private ProjectProperties(){
		kvMap = new HashMap<>();
		Properties prop = new Properties();     
        try{
        	String url = this.getClass().getResource("").getPath(); 
        	String path = url.substring(0, url.indexOf("WEB-INF")) + "WEB-INF/classes/config.properties"; 
        	System.out.println(path);
        	path = path.substring(1);
//        	InputStream in = this.getClass().getResourceAsStream(path);
            InputStream in = new BufferedInputStream (new FileInputStream(path));
            prop.load(in);  
            Iterator<String> it=prop.stringPropertyNames().iterator();
            while(it.hasNext()){
                String key=it.next();
                kvMap.put(key, prop.getProperty(key));
            }
            in.close();
        }
        catch(Exception e){
            System.out.println(e);
        }
	}
	private static ProjectProperties instance;
	
	
	public static ProjectProperties getInstance(){
		if(instance==null){
			instance = new ProjectProperties();
		}
		return instance;
	}
	
	public String getValue(String key){
		if(!this.kvMap.containsKey(key)){
			return null;
		}
		return this.kvMap.get(key);
	}
	public static void main(String args[]){
		ProjectProperties ins = ProjectProperties.getInstance();
		System.out.println("a");
	}

}
