﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace JsonToXmlAPI.Controllers
{
    [Route("api/Conversion")]
    [ApiController]
    public class ConvertController : ControllerBase
    {
        // POST api/values
        [HttpPost("GetConversion")]
        public IActionResult GetConversion([FromBody] string value)
        {
            try
            {
                var xml = ConvertirJson(value).ToString();
                return Ok(xml);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost("ValidateConversion")]
        public IActionResult ValidateConversion([FromBody] string value)
        {
            try
            {
                var xml = ConvertirJson(value).ToString();
                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        public XNode ConvertirJson(string json)
        {
            try
            {
                json = json.Replace("\"", "'");
                XNode xml = JsonConvert.DeserializeXNode(json, "Root");
                return xml;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }
    }
}
