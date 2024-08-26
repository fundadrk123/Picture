import './DrawingApp.css';
import React, { useEffect, useRef, useState } from 'react';

const fabric = require('fabric').fabric;


const DrawingApp = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [drawingMode, setDrawingMode] = useState(true);
    const [isFluorescent, setIsFluorescent] = useState(false);
  
    useEffect(() => {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: drawingMode,
        backgroundColor: '#ffffff',
      });
      setCanvas(initCanvas);
  
      return () => {
        initCanvas.dispose();
      };
    }, [drawingMode]);
  
    
    useEffect(() => {
      if (canvas) {
        if (canvas.isDrawingMode) {
          canvas.freeDrawingBrush.color = isFluorescent ? applyFluorescentEffect(color) : color;
          canvas.freeDrawingBrush.width = brushSize;
        }
      }
    }, [color, brushSize, canvas, isFluorescent]);
  
    const handlePenClick = () => {
      if (canvas) {
        canvas.isDrawingMode = true;
        setIsFluorescent(false);
      }
    };
  
    const handleFluorescentPenClick = () => {
      if (canvas) {
        canvas.isDrawingMode = true;
        setIsFluorescent(true);
      }
    };
  
    const handleEraserClick = () => {
      if (canvas) {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = '#ffffff';
        canvas.freeDrawingBrush.width = brushSize;
      }
    };
  
    const handleSaveClick = () => {
      if (canvas) {
        const dataURL = canvas.toDataURL({
          format: 'png',
          quality: 1.0,
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
      }
    };
  
    const handleTextAdd = () => {
      if (canvas) {
        const text = new fabric.Textbox('', {
          left: 100,
          top: 100,
          fill: color,
          fontSize: 20,
          editable: true,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
        text.enterEditing();
      }
    };
  
    const handleClear = () => {
      if (canvas) {
        canvas.clear();
      }
    };
  
    const handleColorChange = (e) => {
      setColor(e.target.dataset.color);
    };
  
    const handleBrushSizeChange = (e) => {
      setBrushSize(parseInt(e.target.value, 10));
    };
  
    const handleImageUpload = (e) => {
      if (canvas && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgObj = new Image();
          imgObj.onload = () => {
            const img = new fabric.Image(imgObj);
            img.set({
              left: 100,
              top: 100,
              angle: 0,
            });
            canvas.add(img);
            canvas.renderAll();
          };
          imgObj.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  

    const applyFluorescentEffect = (color) => {
    
      const hexToRgb = (hex) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
          r = parseInt(hex.slice(1, 3), 16);
          g = parseInt(hex.slice(3, 5), 16);
          b = parseInt(hex.slice(5, 7), 16);
        }
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
      };
      return hexToRgb(color);
    };
  
    return (
        <div className="canvas-container">
          <div className="button-container">
            <button onClick={handlePenClick}>Kalem</button>
            <button onClick={handleFluorescentPenClick}>Fosforlu Kalem</button>
            <button onClick={handleEraserClick}>Silgi</button>
            <button onClick={handleTextAdd}>Metin Ekle</button>
            <button onClick={handleSaveClick}>Kaydet</button>
            <button onClick={handleClear}>Temizle</button>
            <div className="color-picker-container">
              <label>Kalem Boyutu</label>
              <input type="range" min="1" max="20" value={brushSize} onChange={handleBrushSizeChange} />
            </div>
            <div className='picker-container'>
              <label>Renk Seç</label>
              <button data-color="#000000" onClick={handleColorChange} style={{ backgroundColor: '#000000' }}></button>
              <button data-color="#FF0000" onClick={handleColorChange} style={{ backgroundColor: '#FF0000' }}></button>
              <button data-color="#00FF00" onClick={handleColorChange} style={{ backgroundColor: '#00FF00' }}></button>
              <button data-color="#0000FF" onClick={handleColorChange} style={{ backgroundColor: '#0000FF' }}></button>
              <button data-color="#FFE820" onClick={handleColorChange} style={{ backgroundColor: '#FFE820' }}></button>
              <button data-color="#FF9D00" onClick={handleColorChange} style={{ backgroundColor: '#FF9D00' }}></button>
              <button data-color="#00A0E6" onClick={handleColorChange} style={{ backgroundColor: '#00A0E6' }}></button>
            </div>
            <div className='file-container'>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black',margin:'140px' }} />
          </div>
        </div>
      );
    };
    
  
  export default DrawingApp;