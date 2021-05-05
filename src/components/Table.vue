<template lang="pug">
    .table-holder
        .table-col
            .table-row.head Icon
            .table-row.head Campaign
            .table-row.head Level
            .table-row.head LootID
            .table-row.head LootSubID
            .table-row.head Count
            .table-row.head Action
        .table-col(v-for="item in table")
            .table-row
                .table-icon
                    img(:src="item.Icon")
            .table-row {{item.Campaign}}
</template>

<script>
    export default {
        name: 'Table',
        inject: ['API_HOST'],
        props: {},
        data: () => ({
            Key: "testKey123",
            table: []
        }),

        created() {
            var data;
            data = {Key: this.Key};
            fetch(this.API_HOST + 'test/table', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.table = json.Data
                })
                .catch(function (err) {
                    console.log(err);
                });

        }
    }
</script>
<style scoped lang="scss">
    .table-row{
        display: flex;
        flex: 1;
        padding: 10px 0;
        border: 1px solid black;
        &.head{
            justify-content: center;
        }
    }
    .table-col{
        display: flex;
    }
    .table-holder{
        padding: 50px;
    }
    .table-icon{
        width: 50px;
        height: 50px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
</style>
