using challenge.Data;
using challenge.Models;
using Microsoft.AspNetCore.Mvc;

namespace challenge.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly DataContext _context;
    public UserController(DataContext context)
    {
      _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<List<User>>> Get()
    {
      return Ok(_context.Users.ToList());
    }

    [HttpPost]
    [Route("search")]
    public async Task<ActionResult<List<User>>> Get(User user)
    {
      var filteredUsers = _context.Users
      .Where(u => String.IsNullOrEmpty(user.Name) || u.Name == user.Name)
      .Where(u => String.IsNullOrEmpty(user.CPF) || u.CPF == user.CPF)
      .Where(u => String.IsNullOrEmpty(user.BirthDate) || u.BirthDate == user.BirthDate)
      .Where(u => String.IsNullOrEmpty(user.Address) || u.Address == user.Address)
      .Where(u => String.IsNullOrEmpty(user.State) || u.State == user.State)
      .Where(u => String.IsNullOrEmpty(user.City) || u.City == user.City)
      .Where(u => !Char.IsLetter(user.Sex) || u.Sex == user.Sex)
      .ToList();
      return Ok(filteredUsers);
    }

    [HttpPost]
    public async Task<ActionResult<List<User>>> AddHero(User user)
    {
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      return Ok(_context.Users.ToList());
    }
    [HttpPut]
    public async Task<ActionResult<List<User>>> UpdateHero(User request)
    {
      var dbUser = _context.Users.Find(request.Id);
      if (dbUser == null) return BadRequest("User not found.");
      dbUser.Name = request.Name;
      dbUser.Sex = request.Sex;
      dbUser.State = request.State;
      dbUser.CPF = request.CPF;
      dbUser.City = request.City;
      dbUser.BirthDate = request.BirthDate;
      await _context.SaveChangesAsync();

      return Ok(_context.Users.ToList());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<User>>> DeleteHero(int id)
    {
      var dbUser = _context.Users.Find(id);
      if (dbUser == null) return BadRequest("User not found.");
      _context.Users.Remove(dbUser);
      await _context.SaveChangesAsync();
      return Ok(_context.Users.ToList());
    }
  }
}