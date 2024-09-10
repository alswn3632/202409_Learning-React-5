import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

// useReducer로 요청상태 관리하기
// action.type : SUCCESS / ERROR / LOADING 세가지 상태로..
function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loading : true,
                data : null,
                error : null   
            }
        case 'SUCCESS':
            return {
                loading : false,
                data : action.data,
                error : null   
            }
        case 'ERROR':
            return {
                loading : false,
                data : null,
                error : action.error   
            }
        default:
            throw new Error(`Unhandled action type : ${action.type}`)
    }
}


const User2 = () => {

    const [state,dispatch] = useReducer(reducer,{
        loading : false,
        data : null,
        error : null
    }); // 기본값을 객체로 부여

    const fetchUsers = async() =>{
        try{
            // 요청이 시작되면 loading의 상태를 true로 변경
            dispatch({type:'LOADING'});
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            // setUsers(response.data);
            dispatch({type:'SUCCESS',data:response.data});
        }catch(e){
            // console.log(e);
            dispatch({type:'ERROR',error:e})
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

    const {loading, data:users, error} = state; // state.data => users 키워드로 조회

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다!</div>;
    if(!users) return <div>User null</div>;

    return (
        <div className='user2'>
            <h1>지금은 USER2 페이지 입니다!!!</h1>
            <ul>
                {
                    users.map(user=>( // 여기서 인지할 수 있게됨
                        <li key={user.id}>{user.username}({user.name}) : {user.email}</li>
                    ))
                }
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default User2;