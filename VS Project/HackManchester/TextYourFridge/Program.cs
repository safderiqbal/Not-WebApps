using Clockwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace TextYourFridge
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Clockwork.API api = new API("028646a5dff4200dd4539102cb07e37413de2896");
                SMSResult result = api.Send(new SMS { To = "447763569935", Message = "Hello World" });

                if (result.Success)
                {
                    Console.WriteLine("SMS Sent to {0}, Clockwork ID: {1}", result.SMS.To, result.ID);
                }
                else
                {
                    Console.WriteLine("SMS to {0} failed, Clockwork Error: {1} {2}", result.SMS.To, result.ErrorCode, result.ErrorMessage);
                }

                Console.ReadLine();
            }
            catch (APIException ex)
            {
                // You'll get an API exception for errors
                // such as wrong username or password
                Console.WriteLine("API Exception: " + ex.Message);
            }
            catch (WebException ex)
            {
                // Web exceptions mean you couldn't reach the Clockwork server
                Console.WriteLine("Web Exception: " + ex.Message);
            }
            catch (ArgumentException ex)
            {
                // Argument exceptions are thrown for missing parameters,
                // such as forgetting to set the username
                Console.WriteLine("Argument Exception: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Something else went wrong, the error message should help
                Console.WriteLine("Unknown Exception: " + ex.Message);
            }
        }
    }
}
