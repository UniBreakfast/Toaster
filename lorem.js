import rnd from './rnd.js'


const lorem = {
  words(num1, num2) {
    const arr = [],
          length =  (num1 && num2)   // determine the length
            ? rnd(num1, num2)
            : (num1 || num2 || rnd(3, 16))

    while (arr.length < length) {

      // choose next word, different from the last one
      do  { var word = rnd(lorems) }
      while (word == arr[arr.length-1])

      arr.push(word)
    }
    return arr
  },

  sentence(num1, num2) {
    const words = this.words(num1, num2)

    // throw in some commas
    for ( let i = rnd(2, 12, 'lower');
          i < words.length-2;
          i += rnd(2, 12, 'lower') )     words[i] += ','

    // titlecase 1st word and punctuation at the end
    words[0] = words[0][0].toUpperCase() + words[0].slice(1)
    words[words.length-1] += rnd({'.':5, '!':2, '?':1})

    return words.join(' ')
  },

  paragraph(num1, num2) {
    const wordsIn = (text) => text? text.trim().split(' ').length : 0,
          length =  (num1 && num2)   // determine the length
            ? rnd(num1, num2)
            : (num1 || num2 || rnd(20, 80))

    let text = ''
    while (true) {
      const sent = this.sentence()

      // add generated sentence or generate another that fits
      if (wordsIn(text+sent) < length)  text += (text? ' ':'') + sent
      else if (wordsIn(text) == length)  break
      else  text += ' ' + this.sentence(length - wordsIn(text))
    }
    return text.trim()
  }
}


export default lorem


const lorems =    // words for lorem ipsum generators
  `a,ac,accumsan,ad,adipiscing,aenean,aliquam,aliquet,amet,ante,aptent,arcu,at,
  auctor,augue,aurum,bibendum,blandit,brossi,caputi,class,commodo,condimentum,
  congue,consectetur,consequat,conubia,convallis,cras,cubilia,curabitur,curae,
  cursus,dapibus,diam,dictum,dictumst,dolor,donec,dui,duis,egestas,eget,
  eleifend,elementum,elit,enim,erat,eros,est,et,etiam,eu,euismod,facilisis,
  fames,faucibus,felis,fermentum,feugiat,fringilla,fusce,gnutti,gravida,
  habitant,habitasse,hac,hendrerit,himenaeos,iaculis,id,imperdiet,in,inceptos,
  integer,interdum,ipsum,justo,lacinia,lacus,laoreet,lectus,leo,libero,ligula,
  litora,lobortis,lorem,luctus,maecenas,magna,malesuada,massa,mattis,mauris,
  metus,mi,mobile,molestie,mollis,morbi,more,nam,nec,neque,netus,nibh,nisi,non,
  nostra,nulla,nullam,nunc,odio,orci,ornare,papero,pellentesque,per,perpetum,
  pharetra,phasellus,placerat,platea,porta,porttitor,posuere,potenti,praesent,
  pretium,primis,proin,pulvinar,purus,quam,quis,quisque,rhoncus,risus,rutrum,
  sagittis,sapien,scelerisque,sed,sem,semper,senectus,sit,sociosqu,sodales,
  sollicitudin,spero,spirum,supero,suscipit,suspendisse,taciti,tellus,tempor,
  tempus,tincidunt,torquent,tortor,tristique,turpis,ullamcorper,ultrices,
  ultricies,urna,ut,varius,vedi,vehicula,vel,velit,venenatis,veni,vestibulum,
  vici,vigoro,vitae,vivamus,viverra,volutpat,vulputate`.split(/,\s*/)