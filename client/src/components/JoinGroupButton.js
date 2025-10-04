
function JoinGroupButton({id}) 
{
    const onClickHandler = async () => 
    {
        try
        {
            const res = await fetch(`http://localhost:3000/studygroups/${id}/join`, {
                method: "POST",
                credentials: "include"
            })
            if (!res.ok)
            {
                console.log("Failed to join.")
                return;
            }
            const data = await res.json()
            console.log(data)
        }
        catch (err)
        {
            console.error("Error: ", err)
        }
    }

    return (
        <button onClick={onClickHandler}>Join this Group.</button>
    )
}
export default JoinGroupButton