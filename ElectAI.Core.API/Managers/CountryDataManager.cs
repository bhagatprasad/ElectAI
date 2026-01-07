using ElectAI.Core.API.Models;
using System.Data;

namespace ElectAI.Core.API.Managers
{
    public class CountryDataManager : BaseRepository, ICountryManager
    {
        public CountryDataManager(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<IEnumerable<Country>> GetCountriesListAsync()
        {
            return await base.QueryAsync<Country>("select * from fn_get_countries()", null, commandType: CommandType.Text);
        }
    }
}
