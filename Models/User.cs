namespace challenge.Models
{
  public class User
  {
    public int Id { get; set; }
    public string CPF { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string BirthDate { get; set; } = string.Empty;
    public char Sex { get; set; }
    public string Address { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
  }
}