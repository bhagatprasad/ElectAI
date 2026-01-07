using System.Data;
using System.Data.Common;

namespace ElectAI.Core.API.Managers
{
    public static class Utility
    {
        public static string? SafeGetString(this IDataReader reader, int colIndex)
        {
            if (!reader.IsDBNull(colIndex))
                return reader.GetString(colIndex);
            return null;
        }
        public static bool? SafeGetBoolean(this IDataReader reader, int colIndex)
        {
            if (!reader.IsDBNull(colIndex))
                return reader.GetBoolean(colIndex);
            return null;
        }

        public static bool IsSafe(this IDataReader reader, int colIndex)
        {
            if (!reader.IsDBNull(colIndex))
                return true;
            return false;
        }

        public static T CreateEntity<T>(DbDataReader reader)
        {
            //if (typeof(T) == typeof(Role))
            //    return (T)Convert.ChangeType(reader.ToSingleRole(), typeof(T));

            //if (typeof(T) == typeof(Organization))
            //    return (T)Convert.ChangeType(reader.ToSingleOrganization(), typeof(T));

            throw new Exception($"Unexpected Data type {typeof(T)}");
        }
    }
}
