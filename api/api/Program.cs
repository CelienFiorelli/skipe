using Api.Extensions;
using FluentValidation;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

string cheminCleRsa = builder.Configuration.GetValue<string>("cheminCleRsa")!;

RSA rsa = RSA.Create();

// creer la cle une seule fois
if (!File.Exists(cheminCleRsa))
{
    // cree un fichier bin pour signer le JWT
    var clePriver = rsa.ExportRSAPrivateKey();
    File.WriteAllBytes(cheminCleRsa, clePriver);
}

// recupere la cl�
rsa.ImportRSAPrivateKey(File.ReadAllBytes(cheminCleRsa), out _);

builder.Services.AjouterSecuriteJwt(rsa);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AjouterSwagger();

builder.Services.AddHttpClient("", x =>
{
    x.BaseAddress = new Uri("");
});

builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddCors(x => x.AddDefaultPolicy(y => y.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseCors();
// l'ordre est important
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    // cacher la liste des models import / export dans swagger
    app.UseSwaggerUI(x => x.DefaultModelsExpandDepth(-1));
}

app.AjouterRouteAPI();

app.Run();
