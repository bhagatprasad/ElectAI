namespace ElectAI.Core.API.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Election_System { get; set; }
        public string? Data_Source_Url { get; set; }
        public string? Status { get; set; }
        public DateTime? Created_At { get; set; }
        public DateTime? Modified_At { get; set; }
    }
}
