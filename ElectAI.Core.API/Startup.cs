using ElectAI.Core.API.Managers;
using log4net;
using log4net.Config;
using Newtonsoft.Json;
using System.Reflection;

namespace ElectAI.Core.API;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers().AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
        });


        services.AddControllers();

        services.AddScoped<ICountryManager,CountryDataManager>();

        services.AddLogging(builder =>
        {
            builder.AddLog4Net("log4net.config"); // Points to your config file
        });

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        //XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));


        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Welcome to running ASP.NET Core on AWS Lambda");
            });
        });
    }
}