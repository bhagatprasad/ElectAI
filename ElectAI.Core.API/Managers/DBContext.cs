using Npgsql;

using System.Data;

namespace ElectAI.Core.API.Managers
{
    public class DBContext
    {

        private readonly IConfiguration _configuration;

        public DBContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection CreateConnection()
        {
            string connectionString = _configuration.GetConnectionString("Postgres");
            return new NpgsqlConnection(connectionString);
        }

        // Async version that returns NpgsqlConnection
        public async Task<NpgsqlConnection> CreateAndOpenConnectionAsync()
        {
            string connectionString = _configuration.GetConnectionString("Postgres");
            var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();
            return connection;
        }
    }
}
