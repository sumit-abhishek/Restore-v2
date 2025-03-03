using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers;

public class BuggyController:BaseApiController
{

[HttpGet("not-found")]
public IActionResult GetNotFound()
{
    return NotFound();
}

[HttpGet("bad-request")]
public IActionResult GetBadRequest()
{
    return BadRequest("This is a Bad Request");
}

[HttpGet("unauthorized")]
public IActionResult GetUnauthorized()
{
    return Unauthorized();
}

[HttpGet("validation-error")]
public IActionResult GetValidationError()
{
    ModelState.AddModelError("Problem1","This is the first error");
    ModelState.AddModelError("Problem2","This is the second error");
    return ValidationProblem();
}

[HttpGet("server-error")]
public IActionResult GetServerError()
{
    throw new Exception("This is a Server Error");
}

}
