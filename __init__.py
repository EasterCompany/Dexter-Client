from core.library import Path, client, dirname, realpath


class Client(client.NativeClient):
  ENV:str = __file__.replace('__init__.py', '.env')
  DIR:str = Path(dirname(realpath(__file__))).parts[-1]
  NAME:str = "Dexter"
  PWA:bool = False
  API_DOMAIN:str = "https://dexter.easter.company"

  def __init__(self) -> None:
    super().__init__()

  def __urls__(self, *args, **kwargs) -> list:
    '''
    Generates an additional url map for this client, each item should use the self.path
    function to create an endpoint.
    '''
    return []

  def __context__(self, req, *args, **kwargs) -> dict:
    '''
    Generates a context dictionary which is provided to the HTML Template, each value can
    be rendered inside the index.html file by calling the key with {{ handle_bar }} variables.
    '''
    return {
      "page_title": self.NAME
    }
