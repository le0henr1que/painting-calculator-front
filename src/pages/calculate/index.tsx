import React, { FormEvent, useState } from 'react';
import './styles.css';
import Wall from '../../components/Wall-Input'
import api from '../../service';
import { error } from 'console';

interface CansNeeded {
    dezoito: number;
    tresVirgulaSeis: number;
    doisVirgulaCinco: number;
    zeroVirgulaCinco: number;
    AreaTotal: number;
    totalInk:number;
  }
interface Area {
    height:number | undefined;
    width:number | undefined;
}
  

function Calculate() {
    const [count, setCount] = useState(1);

    const [load, setLoad] = useState("Calcular");
    const [responseCalc, setResponseCalc] = useState<CansNeeded>();

    const handleAddWall = () => {

        setCount(count + 1);
        if(count === 4){
            alert("Só é possivel adicionar quatro lados")
            setCount(4);
        }
    }
    function replaceValue(value: number | string | any | undefined){
        

        if(value.includes(',')){
            return +value.replace(",", ".")
        }
        return +value
    }

    async function handleLogin(event: FormEvent){
        setLoad("Calculando...")
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

       

        const sendArray = {
                "wall":{
                    "measure":[]
                },
                
                "door":{
                    "measure":[{"height":1.90, "width":0.80}]
                },
            
                "window":{
                    "measure":[{"height":1.20, "width":2.00}]
                } 
        }
        
        
        if(data.height0 && data.width0){
            
            const wallOne:Area = {
                "height":replaceValue(data.height0), 
                "width":replaceValue(data.width0)
            }
            // @ts-ignore
            sendArray.wall.measure.push(wallOne)
        }
        if(data.height1 && data.width1){
            
            const wallTwo:Area = {
                "height":replaceValue(data.height1), 
                "width":replaceValue(data.width1)
            }
            // @ts-ignore
            sendArray.wall.measure.push(wallTwo)
        }
        if(data.height2 && data.width2){
            
            const wallThree:Area = {
                "height":replaceValue(data.height2), 
                "width":replaceValue(data.width2)
            }
            // @ts-ignore
            sendArray.wall.measure.push(wallThree)
        }
        if(data.height3 && data.width3){
            
            const wallFour:Area = {
                "height":replaceValue(data.height3), 
                "width":replaceValue(data.width3)
            }
            // @ts-ignore
            sendArray.wall.measure.push(wallFour)
        }


        sendArray.door.measure.length = 0
        for(var door = 0; door < +data.amountDoor; door++){
            sendArray.door.measure.push({"height":1.90, "width":0.80})
        }
        
        sendArray.window.measure.length = 0
        for(var window = 0; window < +data.amountWindow; window++){
            sendArray.window.measure.push({"height":1.20, "width":2.00})
        }

        console.log(sendArray)
        
        await api.post(`/calculate`, sendArray)
        .then(response => {
            console.log(response)
            setResponseCalc(response.data.result)
            setLoad("Calcular")
        })
        .catch((error) => {
            if(error.response.status === 400){
                alert(error.response.data.message)
            }
            setLoad("Calcular")
        })

        
    }

    const componentsWall = Array.from({ length: count }, (_, i) => 
        <Wall 
            label1="Altura da Parede" 
            label2="Largura da parede"
            placeholder1="Exemplo: 1.2"
            placeholder2="Exemplo: 1.2"
            key={i}  
            id1={`height`+i}
            id2={`width`+i}
            name1={`height`+i}
            name2={`width`+i}
        />);


  return (  
    <>
        <div className='containerMain'>
            <div className='title'>
                <span>Calculadora de <span>tinta</span></span>
            </div>
            <div className='alert'>
                <h2>Observações</h2>
                <ul>
                    <li><p>O total de área das portas e janelas deve ser no máximo 50% da área de parede.</p></li>
                    <li><p>A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta.</p></li>
                    <li><p>A área da janela somado com a área da porta não pode ser menor que o total da área das paredes.</p></li>
                    <li><p>Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 50 metros quadrados.</p></li>
                </ul>
            </div>

            <div className='content-inputs'>
                <form onSubmit={handleLogin} >
                    {componentsWall}
                    <div className='add-component' onClick={handleAddWall}>Adicionar Parede</div>
                    <Wall 
                        label1="Quantidade de porta" 
                        label2="Quantidade de janela"
                        placeholder1="Exemplo: 2"
                        placeholder2="Exemplo: 3"
                        id1="amountDoor"
                        id2="amountWindow"
                        name1="amountDoor"
                        name2="amountWindow"
                    />

                    <button className='add-component'>{load}</button>

                </form>
                
            </div>
                
        
            {responseCalc?.AreaTotal !== 0 && responseCalc?.AreaTotal &&

            <div className='title-ink'>
                <p>Uma vez que cada litros de tinta pintam 5 m², para pintar um ambiente com a área de {responseCalc?.AreaTotal} m² desconsiderando portas e janelas você vai precisar 
                de {responseCalc?.totalInk} litros de tinta, o mesmo que:
                </p>
                <div className='response-ink'>
                        

                        <div className='ink-one'>
                            <p>{responseCalc?.zeroVirgulaCinco} baldes de 0.5 litros</p>
                        </div>
                
                        <div className='ink-one'>
                            <p>{responseCalc?.doisVirgulaCinco} baldes de 2.5 litros</p>
                        </div>

                        <div className='ink-one'>
                            <p>{responseCalc?.tresVirgulaSeis} baldes de 3.6 litros</p>
                        </div>
                
                        <div className='ink-one'>
                            <p>{responseCalc?.dezoito} baldes de 18 litros</p>
                        </div>
                </div>
                
            </div>
            }
        </div>
        
    </>

  );
}

export default Calculate;