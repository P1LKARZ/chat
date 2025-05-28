import "../Components/Start-page.css";
export default function Start ({onStart}) {
 return (
 <div className="start-page">
 <button className="start-page-btn" onClick={onStart}>chat</button>
 </div>
 );
}
