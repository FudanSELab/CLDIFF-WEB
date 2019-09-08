package edu.fdu.se.web.astdiff;

import javax.servlet.ServletContext;
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
	private ProjectProperties(ServletContext sc){
		kvMap = new HashMap();
		Properties prop = new Properties();     
        try{
			InputStream in = sc.getResourceAsStream("/WEB-INF/classes/config.properties");
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
	
	
	public static ProjectProperties createInstance(ServletContext sc){
		if(instance==null){
			instance = new ProjectProperties(sc);
		}
		return instance;
	}

	public static ProjectProperties getInstance(){
		return instance;
	}



	
	public String getValue(String key){
		if(!this.kvMap.containsKey(key)){
			return null;
		}
		return this.kvMap.get(key);
	}


}
