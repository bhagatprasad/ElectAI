using ElectAI.Core.API.Managers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ElectAI.Core.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryManager _countryManager;
        private readonly ILogger<CountryController> _logger;
        public CountryController(ICountryManager countryManager, ILogger<CountryController> logger)
        {
            _countryManager = countryManager;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetCountries()
        {
            try
            {
                var response = await _countryManager.GetCountriesListAsync();
                _logger.LogInformation("GetCountries... {Response}", JsonConvert.SerializeObject(response));
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetCountries failed");
                return BadRequest(ex.Message);
            }
        }
    }
}
