import boto3
import json
import os
from datetime import datetime

def generarDiagrama(event, context):
    from diagrams import Diagram
    from diagrams.aws.compute import EC2, Lambda
    from diagrams.aws.network import VPC
    
    # Proteger el Lambda
    token = event['headers']['Authorization']
    lambda_client = boto3.client('lambda')
    
    # Usar el nombre completo de la función desde la variable de entorno
    lambda_name = os.environ.get('VALIDAR_TOKEN_LAMBDA_NAME')
    payload_string = json.dumps({ "token": token })
    invoke_response = lambda_client.invoke(FunctionName=lambda_name,
                                           InvocationType='RequestResponse',
                                           Payload = payload_string)
    response = json.loads(invoke_response['Payload'].read())
    if response.get('statusCode') != 200:
        return {
            'statusCode' : 403,
            'body' : json.dumps({'error': 'Forbidden - Acceso No Autorizado'})
        }

    # EXTRAER EL BODY CORRECTAMENTE
    raw_body = event.get('body')

def validarTokenAcceso(event, context):
    # 1. Unificar la extracción del token para ambos tipos de invocación
    token = None
    # Intenta obtener el token desde el body de una petición HTTP
    if 'body' in event and isinstance(event.get('body'), str):
        try:
            payload = json.loads(event['body'])
            token = payload.get('token')
        except (json.JSONDecodeError, TypeError):
            # El body no es un JSON válido, puede ser una invocación directa
            pass

    # Si no se encontró en el body, intenta obtenerlo directamente del evento
    if not token and 'token' in event:
        token = event.get('token')

    # 2. Validación del token
    if not token:
        return {'statusCode': 400, 'body': json.dumps({'error': 'Token no proporcionado'})}

    # 3. Proceso de validación en DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('t_tokens_acceso')
    response = table.get_item(Key={'token': token})

    if 'Item' not in response:
        return {'statusCode': 403, 'body': json.dumps({'error': 'Token no existe'})}

    expires = response['Item']['expires']
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    if now > expires:
        return {'statusCode': 403, 'body': json.dumps({'error': 'Token expirado'})}

    # Salida (json)
    return {'statusCode': 200, 'body': json.dumps({'message': 'Token válido'})}

def guardarDiagramaS3(event, context):
    # Proteger el Lambda
    token = event['headers']['Authorization']
    lambda_client = boto3.client('lambda')
    
    # Usar el nombre completo de la función desde la variable de entorno
    lambda_name = os.environ.get('VALIDAR_TOKEN_LAMBDA_NAME')
    payload_string = json.dumps({ "token": token })
    invoke_response = lambda_client.invoke(FunctionName=lambda_name,
                                           InvocationType='RequestResponse',
                                           Payload = payload_string)
    response = json.loads(invoke_response['Payload'].read())
    if response.get('statusCode') != 200:
        return {
            'statusCode' : 403,
            'body' : json.dumps({'error': 'Forbidden - Acceso No Autorizado'})
        }

    # EXTRAER EL BODY CORRECTAMENTE
    raw_body = event.get('body') 