using FFMpegCore;
using FFMpegCore.Enums;
using ImageMagick;
using Microsoft.AspNetCore.Mvc;

namespace LongExposureBackend.Controller;

[ApiController]
[Route("[controller]")]
public class VideoController
{
    private readonly IWebHostEnvironment _environment;
    
    public VideoController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost]
    public async Task<IActionResult> UploadVideo(IFormFile videoFile)
    {
        /*
        string uploads = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
        string filePath = Path.Combine(uploads, videoFile.FileName);
        using (Stream fileStream = new FileStream(filePath, FileMode.Create))
        {
            await videoFile.CopyToAsync(fileStream);
        }

        string results = Path.Combine(Directory.GetCurrentDirectory(), "imgs");
        await FFMpegArguments
            .FromFileInput(filePath)
            .OutputToFile(results+"/test%3d.png", true, options => options
                .WithVideoCodec(VideoCodec.Png)
                .WithFramerate(3))
            .ProcessAsynchronously();
*/
        string results = Path.Combine(Directory.GetCurrentDirectory(), "imgs");
        var resultImages = Directory.GetFiles(results, "test*.png").ToList();
        using var images = new MagickImageCollection( resultImages.Select(path=> new MagickImage(path)).ToArray() );
        images.Evaluate(EvaluateOperator.Median).Write(results+"/median.jpg");
        
        return new OkResult();
    }
}