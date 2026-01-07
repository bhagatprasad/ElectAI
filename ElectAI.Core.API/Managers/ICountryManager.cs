using ElectAI.Core.API.Models;

namespace ElectAI.Core.API.Managers
{
    public interface ICountryManager
    {
        Task<IEnumerable<Country>> GetCountriesListAsync();
    }
}
