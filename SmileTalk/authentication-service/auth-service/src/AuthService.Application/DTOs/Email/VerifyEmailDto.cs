namespace AuthService.Application.DTOs.Email;
using System.ComponentModel.DataAnnotations;

public class VerifyEmailDto
{
    [Required]
    public string Token { get; set; } = string.Empty;
}
