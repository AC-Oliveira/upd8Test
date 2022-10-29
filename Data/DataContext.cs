using Microsoft.EntityFrameworkCore;

namespace challenge.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
    public DbSet<Models.User> Users { get; set; }
  }
}