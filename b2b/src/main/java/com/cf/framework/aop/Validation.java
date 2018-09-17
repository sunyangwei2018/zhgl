/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cf.framework.aop;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.SchemaFactory;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

/**
 *
 * @author root
 */
public class Validation {

    public void validateExternalSchema(HttpServletRequest request) throws IOException, SAXException, ParserConfigurationException {

        if (JlInterceptor.isQueryURI(request)) {
            return;
        }

        String uri = request.getRequestURI();
        String root = request.getContextPath();
        uri = uri.replace(root, "");
        String filename = uri.substring(uri.indexOf("/") + 1);
        filename = filename.substring(0, filename.indexOf("/")) + ".xsd";
//        filename = request.getSession().getServletContext().getRealPath("/") + "WEB-INF/classes/com/cf/validation/" + filename;
        filename = this.getClass().getResource("/") + "com/cf/validation/" + filename;
        File xsdfile = new File(filename);
        if (!xsdfile.exists()) {
            return;
        }

        String xml = request.getParameter("XmlData");
        if (xml == null || !xml.startsWith("<?xml")) {
            return;
        }

        SAXParserFactory factory = SAXParserFactory.newInstance();
        factory.setValidating(false);
        factory.setNamespaceAware(true);

        SchemaFactory schemaFactory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
        factory.setSchema(schemaFactory.newSchema(new Source[]{new StreamSource(filename)}));

        SAXParser parser = factory.newSAXParser();
        XMLReader reader = parser.getXMLReader();
        StringReader xmlreader = new StringReader(xml);
        reader.parse(new InputSource(xmlreader));
    }
}
