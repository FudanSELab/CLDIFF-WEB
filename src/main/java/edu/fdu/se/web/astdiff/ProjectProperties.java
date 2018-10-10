package edu.fdu.se.web.astdiff;

import jdk.internal.util.xml.impl.Input;

import javax.servlet.ServletContext;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties; 

public class ProjectProperties {
	private Map<String,String> kvMap;

	public boolean isWindows() {
		return System.getProperties().getProperty("os.name").toUpperCase().indexOf("WINDOWS") != -1;

	}
	private ProjectProperties(){
		kvMap = new HashMap();
		Properties prop = new Properties();     
        try{
//        	String url = this.getClass().getResource("").getPath();
			InputStream in = ServletContext.class.getResourceAsStream("/WEB-INF/classes/config.properties");
//        	String path = url.substring(0, url.indexOf("WEB-INF")) + "WEB-INF/classes/config.properties";

//			if(isWindows()){
//				if(path.startsWith("/")){
//					path = path.substring(1);
//				}
//			}
//			System.out.println("Path: "+path);
//        	path = path.substring(1);
//        	InputStream in = this.getClass().getResourceAsStream(path);
//            InputStream in = new BufferedInputStream (new FileInputStream(path));
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
