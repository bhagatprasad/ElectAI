using Dapper;
using ElectAI.Core.API.Constants;
using Npgsql;
using System.Data;

namespace ElectAI.Core.API.Managers
{


    public class BaseRepository : DBContext
    {
        public BaseRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<T> QueryFirstOrDefaultAsync<T>(
            string sql,
            object parameters = null,
            IDbTransaction dbTransaction = null,
            int? commandTimeOut = null,
            CommandType commandType = CommandType.Text)
        {
            using var connection = CreateConnection();
            connection.Open(); // Changed from OpenAsync()

            return await connection.QueryFirstOrDefaultAsync<T>(
                sql,
                parameters,
                dbTransaction,
                commandTimeOut ?? Global.COMMAND_TIMEOUT_IN_SECONDS,
                commandType);
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(
            string sql,
            object parameters = null,
            IDbTransaction dbTransaction = null,
            int? commandTimeOut = null,
            CommandType commandType = CommandType.Text)
        {
            using var connection = CreateConnection();
            connection.Open(); // Changed from OpenAsync()

            return await connection.QueryAsync<T>(
                sql,
                parameters,
                dbTransaction,
                commandTimeOut ?? Global.COMMAND_TIMEOUT_IN_SECONDS,
                commandType);
        }

        public async Task<T> ExecuteScalarAsync<T>(
            string sql,
            object parameters = null,
            IDbTransaction dbTransaction = null,
            int? commandTimeOut = null,
            CommandType commandType = CommandType.Text)
        {
            using var connection = CreateConnection();
            connection.Open(); // Changed from OpenAsync()

            return await connection.ExecuteScalarAsync<T>(
                sql,
                parameters,
                dbTransaction,
                commandTimeOut ?? Global.COMMAND_TIMEOUT_IN_SECONDS,
                commandType);
        }

        // Alternative: If you really need async open, cast to NpgsqlConnection
        public async Task<T> QueryFirstOrDefaultAsyncWithAsyncOpen<T>(
            string sql,
            object parameters = null,
            IDbTransaction dbTransaction = null,
            int? commandTimeOut = null,
            CommandType commandType = CommandType.Text)
        {
            using var connection = CreateConnection();
            if (connection is NpgsqlConnection npgsqlConnection)
            {
                await npgsqlConnection.OpenAsync(); // Now it's async
            }
            else
            {
                connection.Open(); // Fallback to synchronous
            }

            return await connection.QueryFirstOrDefaultAsync<T>(
                sql,
                parameters,
                dbTransaction,
                commandTimeOut ?? Global.COMMAND_TIMEOUT_IN_SECONDS,
                commandType);
        }

        // Better approach: Create a reusable async connection method
        private async Task<NpgsqlConnection> CreateAndOpenConnectionAsync()
        {
            var connection = CreateConnection() as NpgsqlConnection;
            if (connection == null)
            {
                throw new InvalidOperationException("Connection must be NpgsqlConnection");
            }

            await connection.OpenAsync();
            return connection;
        }

        // Using the async connection method
        public async Task<IEnumerable<T>> QueryAsyncWithAsyncConnection<T>(
            string sql,
            object parameters = null,
            IDbTransaction dbTransaction = null,
            int? commandTimeOut = null,
            CommandType commandType = CommandType.Text)
        {
            using var connection = await CreateAndOpenConnectionAsync();

            return await connection.QueryAsync<T>(
                sql,
                parameters,
                dbTransaction,
                commandTimeOut ?? Global.COMMAND_TIMEOUT_IN_SECONDS,
                commandType);
        }

        // Execute method for non-query commands
        public async Task<int> ExecuteAsync(
            string sql,
            object parameters = null,
            IDbTransaction dbTransaction = null,
            int? commandTimeOut = null,
            CommandType commandType = CommandType.Text)
        {
            using var connection = CreateConnection();
            connection.Open();

            return await connection.ExecuteAsync(
                sql,
                parameters,
                dbTransaction,
                commandTimeOut ?? Global.COMMAND_TIMEOUT_IN_SECONDS,
                commandType);
        }
    }
}
