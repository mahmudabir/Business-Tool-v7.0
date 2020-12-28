using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BTv7.Models.ViewModel
{
    public class SearchProduct
    {
        [Required]
        public int low { get; set; }
        [Required]
        public int high { get; set; }
        [Required]
        public string search { get; set; }
        [Required]
        public string sort { get; set; }
    }
}